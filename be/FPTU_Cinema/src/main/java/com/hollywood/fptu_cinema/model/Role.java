package com.hollywood.fptu_cinema.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Role {
    @Id
    @Column(name = "role_id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @Column(name = "role_name")
    private String roleName;

}