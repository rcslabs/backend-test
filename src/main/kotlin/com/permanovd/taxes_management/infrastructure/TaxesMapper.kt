package com.permanovd.taxes_management.infrastructure

import com.permanovd.taxes_management.domain.TaxesEntry
import org.apache.ibatis.annotations.Select

public interface TaxesMapper {
    @Select("SELECT * FROM source_data")
    fun getAll(): List<TaxesEntry>?
}