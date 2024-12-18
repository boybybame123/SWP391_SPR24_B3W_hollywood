package com.hollywood.fptu_cinema.controller;

import com.hollywood.fptu_cinema.service.PaymentService;
import com.hollywood.fptu_cinema.viewModel.PaymentInfoDTO;
import com.hollywood.fptu_cinema.viewModel.Response;
import io.swagger.v3.oas.annotations.Operation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private static final Logger logger = LogManager.getLogger(PaymentController.class);
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @Operation(summary = "Payment Information")
    @Secured({"MEMBER"})
    @GetMapping("/getPaymentInfo/{ticketId}")
    public ResponseEntity<?> getPaymentInfo(@PathVariable int ticketId) {
        try {
            PaymentInfoDTO paymentInfo = paymentService.preparePaymentInfo(ticketId);
            logger.info("Retrieved payment information successfully for ticket ID: {}", ticketId);
            return Response.success(paymentInfo);
        } catch (Exception e) {
            logger.error("Error retrieving payment information for ticket ID: {}. Error: {}", ticketId, e.getMessage(), e);
            return Response.error(e);
        }
    }
}
