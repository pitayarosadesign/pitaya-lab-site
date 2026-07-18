-- ============================================
-- PITAYA LAB - Inventario y Showroom
-- ============================================

-- 1. UBICACIONES DE INVENTARIO
CREATE TABLE IF NOT EXISTS inventory_locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT,
  type TEXT NOT NULL DEFAULT 'warehouse' CHECK (type IN ('warehouse', 'showroom', 'web_reserved')),
  store_id UUID REFERENCES commerce_stores(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insertar ubicación por defecto
INSERT INTO inventory_locations (id, name, short_name, type)
VALUES ('almacen_central', 'Almacén Central', 'Almacén', 'warehouse')
ON CONFLICT (id) DO NOTHING;

INSERT INTO inventory_locations (id, name, short_name, type)
VALUES ('web_reserved', 'Reservado Web', 'Web', 'web_reserved')
ON CONFLICT (id) DO NOTHING;

-- 2. INVENTARIO POR UBICACIÓN
CREATE TABLE IF NOT EXISTS inventory_by_location (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  location_id TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  min_stock INTEGER DEFAULT 5,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(product_id, location_id)
);

-- 3. MOVIMIENTOS DE INVENTARIO
CREATE TABLE IF NOT EXISTS inventory_movements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('in', 'out', 'transfer')),
  quantity INTEGER NOT NULL,
  reason TEXT NOT NULL,
  note TEXT,
  from_location TEXT,
  to_location TEXT,
  created_by TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. COMERCIOS / SHOWROOM
CREATE TABLE IF NOT EXISTS commerce_stores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'store' CHECK (type IN ('hotel', 'store', 'spa', 'restaurant', 'other')),
  commission NUMERIC(5,2) DEFAULT 20,
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  location_code TEXT UNIQUE,
  address TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. VENTAS POR COMERCIO
CREATE TABLE IF NOT EXISTS commerce_sales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID REFERENCES commerce_stores(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  commission NUMERIC(10,2),
  commission_amount NUMERIC(10,2),
  payment_method TEXT DEFAULT 'cash' CHECK (payment_method IN ('cash', 'card', 'transfer', 'other')),
  notes TEXT,
  sold_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. CORTES DE COMISIONES
CREATE TABLE IF NOT EXISTS commerce_cuts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID REFERENCES commerce_stores(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_sales NUMERIC(10,2) DEFAULT 0,
  total_commission NUMERIC(10,2) DEFAULT 0,
  tax_rate NUMERIC(5,2) DEFAULT 16,
  tax_amount NUMERIC(10,2) DEFAULT 0,
  net_amount NUMERIC(10,2) DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
  paid_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ÍNDICES
CREATE INDEX IF NOT EXISTS idx_inventory_by_location_product ON inventory_by_location(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_by_location_location ON inventory_by_location(location_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_product ON inventory_movements(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_created ON inventory_movements(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_commerce_sales_store ON commerce_sales(store_id);
CREATE INDEX IF NOT EXISTS idx_commerce_sales_created ON commerce_sales(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_commerce_cuts_store ON commerce_cuts(store_id);

-- FUNCIÓN: Actualizar stock total en products cuando cambia inventory_by_location
CREATE OR REPLACE FUNCTION update_product_total_stock()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products
  SET stock = (
    SELECT COALESCE(SUM(stock), 0)
    FROM inventory_by_location
    WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
    AND location_id != 'web_reserved'
  )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar stock total
DROP TRIGGER IF EXISTS trigger_update_product_stock ON inventory_by_location;
CREATE TRIGGER trigger_update_product_stock
AFTER INSERT OR UPDATE OR DELETE ON inventory_by_location
FOR EACH ROW EXECUTE FUNCTION update_product_total_stock();

-- FUNCIÓN: Registrar movimiento y actualizar inventario
CREATE OR REPLACE FUNCTION process_inventory_movement()
RETURNS TRIGGER AS $$
BEGIN
  -- Entrada
  IF NEW.type = 'in' THEN
    INSERT INTO inventory_by_location (product_id, location_id, stock)
    VALUES (NEW.product_id, NEW.to_location, NEW.quantity)
    ON CONFLICT (product_id, location_id)
    DO UPDATE SET stock = inventory_by_location.stock + NEW.quantity,
                  updated_at = now();

  -- Salida
  ELSIF NEW.type = 'out' THEN
    INSERT INTO inventory_by_location (product_id, location_id, stock)
    VALUES (NEW.product_id, NEW.from_location, -NEW.quantity)
    ON CONFLICT (product_id, location_id)
    DO UPDATE SET stock = inventory_by_location.stock - NEW.quantity,
                  updated_at = now();

  -- Transferencia
  ELSIF NEW.type = 'transfer' THEN
    -- Restar de origen
    INSERT INTO inventory_by_location (product_id, location_id, stock)
    VALUES (NEW.product_id, NEW.from_location, -NEW.quantity)
    ON CONFLICT (product_id, location_id)
    DO UPDATE SET stock = inventory_by_location.stock - NEW.quantity,
                  updated_at = now();

    -- Sumar a destino
    INSERT INTO inventory_by_location (product_id, location_id, stock)
    VALUES (NEW.product_id, NEW.to_location, NEW.quantity)
    ON CONFLICT (product_id, location_id)
    DO UPDATE SET stock = inventory_by_location.stock + NEW.quantity,
                  updated_at = now();
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para procesar movimiento automáticamente
DROP TRIGGER IF EXISTS trigger_process_movement ON inventory_movements;
CREATE TRIGGER trigger_process_movement
AFTER INSERT ON inventory_movements
FOR EACH ROW EXECUTE FUNCTION process_inventory_movement();
