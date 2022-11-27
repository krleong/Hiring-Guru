package com.hiringguru.hiring_guru_be.repositories;

import com.hiringguru.hiring_guru_be.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
