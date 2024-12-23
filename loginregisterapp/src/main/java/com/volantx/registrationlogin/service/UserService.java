package com.volantx.registrationlogin.service;

import com.volantx.registrationlogin.entity.Follow;
import com.volantx.registrationlogin.entity.Role;
import com.volantx.registrationlogin.entity.User;
import com.volantx.registrationlogin.repository.RoleRepository;
import com.volantx.registrationlogin.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final FollowService followService;





    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User getOneUserById(String id) {
        return userRepository.findById(id).get();
    }

    public static String getLoggedInUser() {
        //ToDo:
        return "Admin";
    }


    public User editUser(User user) throws Exception {

        if (findUserByEmail(user.getEmail()) != null) {
            throw new Exception("Bu email ile bir kullanıcı zaten vardır.");
        }

        User user1 = userRepository.findById(user.getId()).get();

        if(user.getEmail() == user1.getEmail())

        if (user.getUsername() != null) {
            user1.setUsername(user.getUsername());
        }
        if (user.getFirstName() != null) {
            user1.setFirstName(user.getFirstName());
        }
        if (user.getLastName() != null) {
            user1.setLastName(user.getLastName());
        }
        if (user.getEmail() != null) {
            user1.setEmail(user.getEmail());
        }
        if (user.getAbout() != null) {
            user1.setAbout(user.getAbout());
        }
        if (user.getPhone() != null) {
            user1.setPhone(user.getPhone());
        }

        return userRepository.save(user1);
    }


    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User findUserByEmailAndPassword(String email, String password) throws Exception {


        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        if (email.isEmpty() || password.isEmpty()) {
            throw new Exception("email ve password dolu olmalıdır");
        }

        Optional<User> user = Optional.ofNullable(userRepository.findByEmail(email));

        if (user.isPresent()) {

            if (passwordEncoder.matches((password),user.get().getPassword())){
                return user.get();
            }
        }

        throw new Exception("email veya parola hatalı");
    }


    private Role checkRoleExist() {
        Role role = new Role();
        role.setName("ROLE_ADMIN");
        return roleRepository.save(role);
    }

    public boolean checkUser(String id) {
        return userRepository.existsById(id);
    }


    public List<Follow> getFollowings(String userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.isPresent() ? followService.getFollowersByUserId(userId) : new ArrayList<>();
    }

    public List<User> getFollowingsV2(String userId) {
        //Optional<User> user = userRepository.findById(userId);

        //ToDo: follower lar user üzerinden değil followService üzerinden getirilecek
        List<Follow> followers = followService.getFollowingsByUserId(userId);

        List<User> userList = followers.stream()
                .map(Follow::getFollowing)
                .collect(Collectors.toList());

        return userList;
    }

    public List<Follow> getFollowers(String userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.isPresent() ? followService.getFollowingsByUserId(userId) : new ArrayList<>();
    }

    public List<User> getFollowersV2(String userId) {
        //Optional<User> user = userRepository.findById(userId);

        List<Follow> followings = followService.getFollowersByUserId(userId);

        List<User> userList = followings.stream()
                .map(Follow::getFollower)
                .collect(Collectors.toList());

        return userList;
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }


    public User register(User dto) throws Exception {

        if (findUserByEmail(dto.getEmail()) != null) {
            throw new Exception("Bu email ile bir kullanıcı zaten vardır.");
        } else {


            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = bCryptPasswordEncoder.encode(dto.getPassword());

            User user = new User();
            user.setId(dto.getId());
            user.setUsername(dto.getUsername());
            user.setFirstName(dto.getFirstName());
            user.setLastName(dto.getLastName());
            user.setEmail(dto.getEmail());
            user.setPassword(encodedPassword);
            user.setPhone(dto.getPhone());
            user.setGender(dto.getGender());
            user.setAbout(dto.getAbout());

            return userRepository.save(user);
        }

    }


    //ToDo 
    /*public String encodePassword(String plainPassword) {
        int strength = 10; // work factor of bcrypt
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(strength, new SecureRandom());
        return bCryptPasswordEncoder.encode(plainPassword);
    }*/
}
