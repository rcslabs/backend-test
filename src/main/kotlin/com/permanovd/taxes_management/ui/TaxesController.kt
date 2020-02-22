package com.permanovd.taxes_management.ui

import com.permanovd.taxes_management.domain.TaxesEntry
import com.permanovd.taxes_management.infrastructure.TaxesMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class TaxesController(@Autowired val repo: TaxesMapper) {

    @GetMapping(path = ["/api/taxes"], produces = [MediaType.APPLICATION_JSON_VALUE])
    public fun all(): Collection<TaxesEntry>? {
        return repo.getAll()
    }
}