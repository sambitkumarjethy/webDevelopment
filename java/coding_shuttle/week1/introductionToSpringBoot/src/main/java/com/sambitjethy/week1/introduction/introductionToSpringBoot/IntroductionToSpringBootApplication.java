package com.sambitjethy.week1.introduction.introductionToSpringBoot;

// import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class IntroductionToSpringBootApplication  implements CommandLineRunner {

	@Autowired
	Apple apple1;

	@Autowired
	Apple apple2;

//	@Autowired
//	Orange orange1;
//
//	@Autowired
//	Orange orange2;

	@Autowired
	private DBService dbService;
	public static void main(String[] args) {
		SpringApplication.run(IntroductionToSpringBootApplication.class, args);

		//		Apple obj = new Apple();
		//		obj.eatApple();

		// Orange obj = new Orange();
		// obj.eatOrange();
	}

	@Override
	public void run(String... args) throws Exception {

		apple1.eatApple();
		apple2.eatApple();
//		orange1.eatOrange();
//		orange2.eatOrange();

//		System.out.println(orange1.hashCode());
//		System.out.println(orange2.hashCode());

		// Manually destroy
		//		((DisposableBean) orange1).destroy();
		//		((DisposableBean) orange2).destroy();


		System.out.println(dbService.getData());
	}
}
