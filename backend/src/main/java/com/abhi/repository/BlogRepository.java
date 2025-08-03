package com.abhi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abhi.model.BlogPost;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends JpaRepository<BlogPost, Long> {

}
