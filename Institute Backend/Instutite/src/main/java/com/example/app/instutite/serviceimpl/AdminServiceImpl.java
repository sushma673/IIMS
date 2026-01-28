package com.example.app.instutite.serviceimpl;



import com.example.app.instutite.entity.Admin;
import com.example.app.instutite.repository.AdminRepository;
import com.example.app.instutite.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository repo;

    @Override
    public Admin login(String email, String password) {
        return repo.findByEmailAndPassword(email, password);
    }

    @Override
    public Admin saveAdmin(Admin admin) {
        return repo.save(admin);
    }
    @Override
    public Admin getAdminProfile() {
        return repo.findTopByOrderByIdAsc();
    }
}
