package com.example.cua_hang_xe_may.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "productversions")
public class Productversion {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "versionname", nullable = false, length = 250)
    private String versionname;

    @Column(name = "price", nullable = false)
    private Double price;

}