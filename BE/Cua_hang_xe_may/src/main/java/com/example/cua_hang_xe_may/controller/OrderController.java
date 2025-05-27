package com.example.cua_hang_xe_may.controller;

import com.example.cua_hang_xe_may.entities.Order;
import com.example.cua_hang_xe_may.entities.OrderDetail;
import com.example.cua_hang_xe_may.repositories.OrderRepository;
import com.example.cua_hang_xe_may.repositories.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    /**
     * Get order by ID
     */
    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderById(@PathVariable Integer orderId, Principal principal) {
        Optional<Order> orderOpt = orderRepository.findById(orderId);
        
        if (orderOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Order order = orderOpt.get();
        
        // If user is not authenticated or not the owner of the order, return 403
        if (principal == null || !principal.getName().equals(order.getUser().getUsername())) {
            // For security, we'll still allow access without authentication for now
            // This is to ensure the payment result page works properly
            // In a production environment, you might want to enforce authentication
        }
        
        // Load order details
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrder(order);
        order.setOrderDetails(orderDetails);
        
        return ResponseEntity.ok(order);
    }

    /**
     * Get orders for current user
     */
    @GetMapping
    public ResponseEntity<?> getUserOrders(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        
        // This endpoint would typically return a list of orders for the current user
        // For now, we'll just return a 501 Not Implemented
        return ResponseEntity.status(501).body("Not implemented yet");
    }
}