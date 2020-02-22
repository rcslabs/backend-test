package com.permanovd.taxes_management.domain

import com.fasterxml.jackson.annotation.JsonProperty


data class TaxesEntry(@JsonProperty val section: String,
                      @JsonProperty val type: String,
                      @JsonProperty val province: String,
                      @JsonProperty val region: String,
                      @JsonProperty val year: Int,
                      @JsonProperty val value: Int
)