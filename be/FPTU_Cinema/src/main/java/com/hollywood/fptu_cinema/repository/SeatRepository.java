package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SeatRepository extends JpaRepository<Seat, Integer> {
    Optional<Seat> findBySeatNumber(String seatNumber);

    List<Seat> findByRoomId(Integer id);
}
