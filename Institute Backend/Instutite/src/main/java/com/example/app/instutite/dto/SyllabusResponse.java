package com.example.app.instutite.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SyllabusResponse {

    private Long id;
    private String topicName;
    private String description;
    private String duration;

}
