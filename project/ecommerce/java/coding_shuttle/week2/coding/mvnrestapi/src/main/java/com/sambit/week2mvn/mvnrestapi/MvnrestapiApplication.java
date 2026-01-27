package com.sambit.week2mvn.mvnrestapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
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

		List<String> fruits = List.of("Apple","Banana","Kiwi","Avocado","Mango");
		Stream<String> stream = fruits.stream();
//		stream.forEach((fruit) -> {
//			System.out.println(fruit);
//		});

//		stream
//				.filter(fruit -> fruit.length() < 5)
//				.sorted()
//				.map(fruit ->fruit.length())
//				.map(fruitlengeth -> 2*fruitlengeth)
//				.forEach(fruit -> System.out.println(fruit));


//		 Set<Integer> fruitsList =  fruits
//				.stream()
//				.map(fruit -> fruit.length())
//				.collect(Collectors.toSet());

//		Map<Integer , Integer> fruitsList =  fruits
//				.stream()
//				.map(fruit -> fruit.length())
//						.collect(Collectors.toMap(
//								key->key,
//								value->value
//						));

		Map<String , Integer> fruitsList =  fruits
				.stream()
						.collect(Collectors.toMap(
								fruit -> fruit,
                                String::length
						));






		 System.out.println(fruits);
		System.out.println(fruitsList);
	}

}
interface walkable{
	int walk (int steps);
}
