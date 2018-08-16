package com.tamla.humba.cucumber.stepdefs;

import com.tamla.humba.HumbaApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = HumbaApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
