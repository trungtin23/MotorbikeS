package com.example.cua_hang_xe_may.controller;

import com.example.cua_hang_xe_may.dto.AccountDTO;
import com.example.cua_hang_xe_may.dto.ApiResponse;
import com.example.cua_hang_xe_may.dto.UpdateProfileRequest;
import com.example.cua_hang_xe_may.entities.Account;
import com.example.cua_hang_xe_may.repositories.AccountRepository;
import com.example.cua_hang_xe_may.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountRepository accountRepository;

    @GetMapping
    public ResponseEntity<AccountDTO> getProfile(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        
        AccountDTO profile = accountService.getAccountByUsername(principal.getName());
        return ResponseEntity.ok(profile);
    }

    @PutMapping
    public ResponseEntity<ApiResponse> updateProfile(@RequestBody UpdateProfileRequest request, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(new ApiResponse("Chưa đăng nhập", false));
        }

        try {
            Optional<Account> accountOpt = accountRepository.findByUsername(principal.getName());
            if (accountOpt.isEmpty()) {
                return ResponseEntity.status(404).body(new ApiResponse("Không tìm thấy tài khoản", false));
            }

            Account account = accountOpt.get();
            
            // Cập nhật thông tin
            if (request.getName() != null && !request.getName().isEmpty()) {
                account.setName(request.getName());
            }
            if (request.getPhone() != null && !request.getPhone().isEmpty()) {
                account.setPhone(request.getPhone());
            }
            if (request.getAddress() != null && !request.getAddress().isEmpty()) {
                account.setAddress(request.getAddress());
            }
            if (request.getDob() != null) {
                account.setDob(request.getDob());
            }

            accountRepository.save(account);

            return ResponseEntity.ok(new ApiResponse("Cập nhật thông tin thành công", true));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse("Có lỗi xảy ra khi cập nhật thông tin", false));
        }
    }
} 