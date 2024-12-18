package com.hollywood.fptu_cinema.model;

import com.hollywood.fptu_cinema.enums.SeatStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "Seat", schema = "Movie_Booking_Ticket")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id")
    private Room room;

    @Size(max = 10)
    @NotNull
    @Column(name = "seat_number", nullable = false, length = 10)
    private String seatNumber;

    @Size(max = 50)
    @NotNull
    @Column(name = "seat_type", nullable = false, length = 50)
    private String seatType;

    @NotNull
    @Column(name = "seat_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal seatPrice;

    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status", nullable = false)
    private SeatStatus status;

    @Size(max = 10)
    @NotNull
    @Column(name = "seat_row", nullable = false, length = 10)
    private String seatRow;

}