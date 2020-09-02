package com.mitocode.service.iml;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mitocode.model.Venta;
import com.mitocode.repo.IGenericRepo;
import com.mitocode.repo.IVentaRepo;
import com.mitocode.service.IVentaService;

@Service
public class VentaServiceImpl extends CRUDimpl<Venta, Integer> implements IVentaService{
	
	@Autowired
	private IVentaRepo repo;
	
	@Override
	protected IGenericRepo<Venta, Integer> getRepo() {
		// TODO Auto-generated method stub
		return repo;
	}

	@Override
	public Venta registrarVenta(Venta venta) throws Exception {
		venta.getDetalleVenta().forEach(dev -> dev.setVenta(venta));
		return repo.save(venta);
	}
	
	
	
}
