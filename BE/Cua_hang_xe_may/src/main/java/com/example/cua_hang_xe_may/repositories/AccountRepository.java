package com.example.cua_hang_xe_may.repositories;

import com.example.cua_hang_xe_may.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
}