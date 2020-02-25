package com.permanovd.taxes_management.infrastructure

import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.ResultType
import org.apache.ibatis.annotations.Select

public interface TaxesMapper {
    @Select("SELECT \${row} as \${rowAlias}, \${column} as \${columnAlias}, v as value FROM source_data GROUP BY \${row}, \${column}")
    @ResultType(List::class)
    fun allAggregated(@Param("column") column: String,
                      @Param("row") row: String,
                      @Param("columnAlias") columnAlias: String,
                      @Param("rowAlias") rowAlias: String
    ): List<HashMap<String, Any>>?
}