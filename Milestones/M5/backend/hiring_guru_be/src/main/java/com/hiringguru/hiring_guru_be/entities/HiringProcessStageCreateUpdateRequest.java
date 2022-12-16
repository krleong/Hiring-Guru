package com.hiringguru.hiring_guru_be.entities;

import com.hiringguru.hiring_guru_be.models.HiringProcessStageType;

public class HiringProcessStageCreateUpdateRequest {
    public String title;
    public HiringProcessStageType type;
    public String description;
    public Integer index;
}