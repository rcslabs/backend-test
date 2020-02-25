package com.permanovd.taxes_management

import org.mybatis.spring.annotation.MapperScan
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
@MapperScan("com.permanovd.taxes_management.infrastructure")
class TaxesManagementApplication

fun main(args: Array<String>) {
	runApplication<TaxesManagementApplication>(*args)
}
