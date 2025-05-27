package com.example.cua_hang_xe_may.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequestDTO {
    private String shippingAddress;
    private String shippingPhone;
    private String shippingName;
}