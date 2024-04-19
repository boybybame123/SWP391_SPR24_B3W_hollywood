package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Room;
import com.hollywood.fptu_cinema.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    Room findById(int roomId);

}