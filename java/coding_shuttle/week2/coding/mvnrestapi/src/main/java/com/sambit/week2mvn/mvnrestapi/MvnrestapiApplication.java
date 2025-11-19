package com.sambit.week2mvn.mvnrestapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;
import java.util.stream.Stream;

@SpringBootApplication
public class MvnrestapiApplication {

	public static void main(String[] args) {
		SpringApplication.run(MvnrestapiApplication.class, args);

		walkable obj = (int steps)-> {
			System.out.println("Walking Fast" + steps +" Steps.");
			return 2*steps;
		};
		obj.walk(10);

		List<String> fruits = List.of("Apple","Banana","Kiwi");
		Stream<String> stream = fruits.stream();
		stream.forEach((fruit) -> {
			System.out.println(fruit);
		});
	}

}
interface walkable{
	int walk (int steps);
}
