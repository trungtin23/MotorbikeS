package com.example.cua_hang_xe_may.security;

import com.example.cua_hang_xe_may.entities.Account;
import com.example.cua_hang_xe_may.repositories.AccountRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    public CustomUserDetailsService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        java.util.Optional<Account> account = accountRepository.findByUsername(username);
        if (account.isEmpty()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        Account accountData = account.get();

        // Check if account is active
        if (!"ACTIVE".equals(accountData.getStatus())) {
            throw new UsernameNotFoundException("Account is not active. Please verify your email.");
        }

        String role = mapRole(accountData.getRole());

        org.springframework.security.core.userdetails.User.UserBuilder builder =
                org.springframework.security.core.userdetails.User.withUsername(username);
        builder.password(accountData.getPassword());
        builder.roles(role);

        return builder.build();
    }

    private String mapRole(String roleValue) {
        if (roleValue == null) {
            return "USER";
        }
        switch (roleValue) {
            case "0":
                return "ADMIN";
            case "1":
                return "USER";
            case "2":
                return "MANAGER";
            case "3":
                return "GUEST";
            default:
                return "USER";
        }
    }
}
