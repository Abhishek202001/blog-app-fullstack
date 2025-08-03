package com.abhi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import com.abhi.model.BlogPost;
import com.abhi.model.User;
import com.abhi.repository.BlogRepository;
import com.abhi.repository.UserRepository;
import com.abhi.security.JwtFilter;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "http://localhost:3000")
public class BlogController {

    @Autowired
    private BlogRepository blogRepo;

    @Autowired
    private UserRepository userRepo;

    @GetMapping
    public Page<BlogPost> getAllBlogs(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return blogRepo.findAll(pageable);
    }

    @GetMapping("/{id}")
    public BlogPost getBlog(@PathVariable Long id) {
        return blogRepo.findById(id).orElse(null);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> createBlog(@RequestBody BlogPost blog) {
        String email = JwtFilter.currentUserEmail.get();
        if (email == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");

        User user = userRepo.findByEmail(email).orElse(null);
        blog.setAuthor(user);
        blog.setCreatedAt(LocalDateTime.now());
        blogRepo.save(blog);
        return ResponseEntity.ok("Blog created successfully");
    }

    @PutMapping("/{id}")
    public String updateBlog(@PathVariable Long id, @RequestBody BlogPost updated) {
        BlogPost blog = blogRepo.findById(id).orElse(null);
        if (blog == null) return "Blog not found!";
        blog.setTitle(updated.getTitle());
        blog.setContent(updated.getContent());
        blogRepo.save(blog);
        return "Blog updated!";
    }

    @DeleteMapping("/{id}")
    public String deleteBlog(@PathVariable Long id) {
        blogRepo.deleteById(id);
        return "Blog deleted!";
    }
}
