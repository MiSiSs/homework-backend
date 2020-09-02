package com.mitocode.service.iml;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mitocode.model.Producto;
import com.mitocode.repo.IGenericRepo;
import com.mitocode.repo.IProductoRepo;
import com.mitocode.service.IProductoService;

@Service
public class ProductoServiceImpl extends CRUDimpl<Producto, Integer> implements IProductoService{

	@Autowired
	private IProductoRepo repo;
	
	@Override
	protected IGenericRepo<Producto, Integer> getRepo() {
		// TODO Auto-generated method stub
		return repo;
	}
	
}
