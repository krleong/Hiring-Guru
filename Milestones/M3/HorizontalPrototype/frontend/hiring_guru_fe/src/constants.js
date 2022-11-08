import Member from "./dataclasses/Member";
import Employee from "./dataclasses/Employee";

const MEMBERS = [
    new Member(
        "Team Lead",
        "Farhan Haider",
        "shaider1@sfsu.edu",
        `Hi, my name is Farhan and I am from Lahore, Pakistan. I've been 
        working in the software industry for the last 4 years. I am really 
        excited to resume academic learning. Since I just moved to SF, I am 
        still trying to adjust to the new culture and dynamics.`
    ),
    new Member(
        "Frontend Lead",
        "Kenny Leong",
        "kleong2@mail.sfsu.edu",
        `Hi, I'm Kenny, and I'm an incoming senior in Computer Science with a
        minor in Math. I'm originally from SoCal and am attending SF State because
        I love the area, and the abundance of opportunities in tech here is a huge
        plus. In my free time, I enjoy taking care of my pets, which include 3 dogs
        and 4 chickens.`
    ),
    new Member(
        "Backend Lead",
        "Khushi Khanna",
        "kkhanna@sfsu.edu",
        `Hi, I'm Khushi! I'm originally from the Bay Area, and I am a senior majoring
         in computer science. I am excited to gain more experience working in the
         backend, since I have minimal experience with software engineering.`
    ),
    new Member(
        "Frontend",
        "Mamadou Bah",
        "mbah1@mail.sfsu.edu",
        `Hey! My name is Mamadou and I am a fourth year student at San Fransisco State
        University studying Computer Science. I am originally from the Bay Area and 
        am very excited to wrap up my final semesters with this school and gain as
        much experience as I can with software engineering!`
    ),
    new Member(
        "Backend",
        "Eric Leow",
        "eleow@mail.sfsu.edu",
        `Hi my name is Eric and I started college with a focus on game development and then quickly switched to compter science when I started going to SF state`
    ),
]

const EMPLOYEES = [
    new Employee(
        "Farhan Haider",
        "shaider1@sfsu.edu",
        "123-456-7890",
        "Team Lead",
        "Binary Brains"
    ),
    new Employee(
        "Kenny Leong",
        "kleong2@mail.sfsu.edu",
        "123-456-7890",
        "Frontend Lead",
        "Binary Brains"
    ),
    new Employee(
        "Khushi Khanna",
        "kkhanna@sfsu.edu",
        "123-456-7890",
        "Backend Lead",
        "Binary Brains"
    ),
    new Employee(
        "Mamadou Bah",
        "mbah1@mail.sfsu.edu",
        "123-456-7890",
        "Frontend Engineer",
        "Binary Brains"
    ),
]

export { MEMBERS, EMPLOYEES }
