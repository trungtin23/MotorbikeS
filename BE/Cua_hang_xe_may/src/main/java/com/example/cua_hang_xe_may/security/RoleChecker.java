package com.example.cua_hang_xe_may.security;

import com.example.cua_hang_xe_may.entities.Account;
import com.example.cua_hang_xe_may.entities.Role;
import com.example.cua_hang_xe_may.repositories.AccountRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.Optional;

@Component
public class RoleChecker {
    
    private final AccountRepository accountRepository;
    
    public RoleChecker(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }
    
    /**
     * Check if current user has admin role
     */
    public boolean isAdmin() {
        return hasRole(Role.ADMIN);
    }
    
    /**
     * Check if current user has manager role
     */
    public boolean isManager() {
        return hasRole(Role.MANAGER);
    }
    
    /**
     * Check if current user has user role
     */
    public boolean isUser() {
        return hasRole(Role.USER);
    }
    
    /**
     * Check if current user has admin or manager role
     */
    public boolean isAdminOrManager() {
        return isAdmin() || isManager();
    }
    
    /**
     * Check if current user has specific role
     */
    public boolean hasRole(Role role) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        
        return authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals(role.getAuthority()));
    }
    
    /**
     * Get current user's role
     */
    public Role getCurrentUserRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return Role.GUEST;
        }
        
        String username = authentication.getName();
        Optional<Account> account = accountRepository.findByUsername(username);
        
        if (account.isPresent()) {
            return Role.fromCode(account.get().getRole());
        }
        
        return Role.USER;
    }
    
    /**
     * Check if current user can access resource owned by specific user
     */
    public boolean canAccessUserResource(String resourceOwnerUsername) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        
        String currentUsername = authentication.getName();
        
        // User can access their own resources
        if (currentUsername.equals(resourceOwnerUsername)) {
            return true;
        }
        
        // Admin and Manager can access any user's resources
        return isAdminOrManager();
    }
    
    /**
     * Check if current user can access resource owned by specific user ID
     */
    public boolean canAccessUserResource(Integer resourceOwnerUserId) {
        Optional<Account> resourceOwner = accountRepository.findById(resourceOwnerUserId);
        if (resourceOwner.isEmpty()) {
            return false;
        }
        
        return canAccessUserResource(resourceOwner.get().getUsername());
    }
    
    /**
     * Get current username from security context
     */
    public String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        return authentication.getName();
    }
    
    /**
     * Get current user account
     */
    public Optional<Account> getCurrentUser() {
        String username = getCurrentUsername();
        if (username == null) {
            return Optional.empty();
        }
        return accountRepository.findByUsername(username);
    }
} 