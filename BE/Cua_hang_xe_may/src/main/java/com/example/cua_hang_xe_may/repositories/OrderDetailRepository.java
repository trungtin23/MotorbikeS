package com.example.cua_hang_xe_may.repositories;

import com.example.cua_hang_xe_may.entities.Order;
import com.example.cua_hang_xe_may.entities.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    List<OrderDetail> findByOrder(Order order);
}