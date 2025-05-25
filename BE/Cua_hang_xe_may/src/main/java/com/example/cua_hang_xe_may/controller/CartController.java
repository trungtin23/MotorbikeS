package com.example.cua_hang_xe_may.controller;


import com.example.cua_hang_xe_may.dto.CartResponseDTO;
import com.example.cua_hang_xe_may.dto.ProductColorDTO;
import com.example.cua_hang_xe_may.entities.Productcolor;
import com.example.cua_hang_xe_may.service.ProductService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private ProductService productService;

    private static final String CART_SESSION_KEY = "CART_SESSION";

    @GetMapping
    public List<ProductColorDTO> getCart(HttpSession session) {
        List<ProductColorDTO> cart = (List<ProductColorDTO>) session.getAttribute(CART_SESSION_KEY);
        if (cart == null) {
            cart = new ArrayList<>();
            session.setAttribute(CART_SESSION_KEY, cart);
        }
        return cart;
    }

    @PostMapping("/add")
    public List<ProductColorDTO> addToCart(@RequestBody ProductColorDTO newItem, HttpSession session) {
        List<ProductColorDTO> cart = (List<ProductColorDTO>) session.getAttribute(CART_SESSION_KEY);
        if (cart == null) {
            cart = new ArrayList<>();
        }

        boolean found = false;
        for (ProductColorDTO item : cart) {
            if (item.getId() == newItem.getId()) {
                item.setQuantity(item.getQuantity() + newItem.getQuantity());
                found = true;
                break;
            }
        }

        if (!found) {
            cart.add(newItem);
        }

        session.setAttribute(CART_SESSION_KEY, cart);
        return cart;
    }

    @PostMapping("/update")
    public List<ProductColorDTO> updateQuantity(@RequestParam int id, @RequestParam int quantity, HttpSession session) {
        List<ProductColorDTO> cart = (List<ProductColorDTO>) session.getAttribute(CART_SESSION_KEY);
        if (cart != null) {
            for (ProductColorDTO item : cart) {
                if (item.getId() == id) {
                    item.setQuantity(quantity);
                    break;
                }
            }
        }
        return cart;
    }

    @DeleteMapping("/remove")
    public List<ProductColorDTO> removeFromCart(@RequestParam int id, HttpSession session) {
        List<ProductColorDTO> cart = (List<ProductColorDTO>) session.getAttribute(CART_SESSION_KEY);
        if (cart != null) {
            cart.removeIf(item -> item.getId() == id);
        }
        return cart;
    }

    @GetMapping("/total")
    public CartResponseDTO calculateTotal(HttpSession session) {
        List<ProductColorDTO> cart = (List<ProductColorDTO>) session.getAttribute(CART_SESSION_KEY);
        double total = 0;
        if (cart != null) {
            for (ProductColorDTO item : cart) {
                double price = item.getPrice();
                total += price * item.getQuantity();
            }
        }
        return new CartResponseDTO(total);
    }

}
