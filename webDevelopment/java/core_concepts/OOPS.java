class Pen {
    String color;
    String type; // ballpen ,gel

    public void write(){
        System.out.println("Writing Something");
    }

    public void printColor(){
        System.out.println(this.color);
    }
}

class Student{
    String name;
    int age;

    public void printInfo(){
        System.out.println(this.name);
        System.out.println(this.age);
    }

    Student(String name , int age){
        System.out.println("Constructor called");
        this.name = name;
        this.age = age;
        System.out.println("Constructor called");
    }
}

class  Car{

    String color;
    String brand;
    String name;

    public void printInfo(){
        System.out.println(this.color);
        System.out.println(this.brand);
        System.out.println(this.name);
    }
    Car(Car car2){
        this.color = car2.color;
        this.brand = car2.brand;
        this.name = car2.name;
    }
    Car(){

    }


}

public class OOPS {
    public static void main(String args[]){
        Pen pen1 = new Pen();
        pen1.color ="blue";
        pen1.type ="gel";

        pen1.write();

        Pen pen2 = new Pen();
        pen2.color ="black";
        pen1.type ="ballpen";

        pen1.printColor();
        pen2.printColor();

        Student s1 = new Student("Sambit", 32); // constructor
//        s1.name ="Sambit";
//        s1.age  = 30;
        s1.printInfo();

        // Copy Constructor
        Car car1 = new Car();
        car1.brand = "TATA";
        car1.color = "red";
        car1.name = "CRETA";

        Car car2 = new Car(car1);
        car2.printInfo();




    }
}



