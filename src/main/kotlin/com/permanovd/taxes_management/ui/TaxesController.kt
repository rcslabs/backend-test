package com.permanovd.taxes_management.ui

import com.permanovd.taxes_management.infrastructure.TaxesMapper
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin("*")
class TaxesController(val repo: TaxesMapper) {

    @GetMapping(path = ["/api/taxes-aggregated"], produces = [MediaType.APPLICATION_JSON_VALUE])
    fun group(@RequestParam("col") column: String,
              @RequestParam("row") row: String): List<Any>? {
        val paramMap = paramMap()
        if (!paramMap.containsKey(column) || !paramMap.containsKey(row)) {
            throw IllegalArgumentException("Wrong column or row args");
        }

        return repo.allAggregated(paramMap[column]!!, paramMap[row]!!, column, row)
    }

    private fun paramMap(): HashMap<String, String> {
        val paramMap = HashMap<String, String>();
        paramMap["section"] = "a"
        paramMap["type"] = "b"
        paramMap["province"] = "c"
        paramMap["region"] = "d"
        paramMap["year"] = "y"
        paramMap["value"] = "v"
        return paramMap
    }
}