package com.mitocode.service;

import com.mitocode.model.Venta;

public interface IVentaService extends ICRUD<Venta, Integer>{
	Venta registrarVenta(Venta venta) throws Exception;
}
