package com.mitocode.service.iml;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mitocode.model.Persona;
import com.mitocode.repo.IGenericRepo;
import com.mitocode.repo.IPersonaRepo;
import com.mitocode.service.IPersonaService;

@Service
public class PersonaServiceImpl extends CRUDimpl<Persona, Integer> implements IPersonaService{

	@Autowired
	private IPersonaRepo repo;
	
	@Override
	protected IGenericRepo<Persona, Integer> getRepo() {
		// TODO Auto-generated method stub
		return repo;
	}

}