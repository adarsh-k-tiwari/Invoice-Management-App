package com.higradius;
import java.sql.*;

public class Pojo {
	private String business_code;
    private String cust_number;
    private String name_customer;
    private String clear_date;
    private Double business_year;
    private Double doc_id;
    private Date posting_date;
    private Date document_create_date;
    private Date due_in_date;
    private String invoice_currency;
    private String document_type;
    private Float posting_id;
    private String area_business;
    private Double total_open_amount;
    private Date baseline_create_date;
    private String cust_payment_terms;
    private String invoice_id;
    private Integer isOpen;
    private String notes;
    
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public String getbusiness_code() {
    	return business_code;
    }
    public void setbusiness_code(String b_code) {
    	business_code = b_code;
    }
    
    public String getcust_number() {
    	return cust_number;
    }
    public void setcust_number(String c_number) {
    	cust_number = c_number;
    }
    
    public String getname_customer() {
    	return name_customer;
    }
    public void setname_customer(String n_cust) {
    	name_customer = n_cust;
    }
    
    public String getclear_date() {
    	return clear_date;
    }
    public void setclear_date(String clr_date) {
    	clear_date = clr_date;
    }
    
    public Double getbusiness_year() {
    	return business_year;
    }
    public void setbusiness_year(Double b_year) {
    	business_year = b_year;
    }
    
    public Double getdoc_id() {
    	return doc_id;
    }
    public void setdoc_id(Double d_id) {
    	doc_id= d_id;
    }
    
    public Date getposting_date() {
    	return posting_date;
    }
    public void setposting_date(Date p_date) {
    	posting_date = p_date;
    }	
    
    public Date getdocument_create_date() {
    	return document_create_date;
    }
    public void setdocument_create_date(Date doc_create_date) {
    	document_create_date = doc_create_date;
    }
    
    public Date getdue_in_date() {
    	return due_in_date;
    }
    public void setdue_in_date(Date due_date) {
    	due_in_date = due_date;
    }
    
    public String getinvoice_currency() {
    	return invoice_currency;
    }
    public void setinvoice_currency(String currency) {
    	invoice_currency = currency;
    }
    
    public String getdocument_type() {
    	return document_type;
    }
    public void setdocument_type(String doc_type) {
    	document_type = doc_type;
    }
    
    public Float getposting_id() {
    	return posting_id;
    }
    public void setposting_id(Float post_id) {
    	posting_id = post_id;
    }
    
    public String getarea_business() {
    	return area_business;
    }
    public void setarea_business(String area) {
    	area_business = area;
    }
    
    public Double gettotal_open_amount() {
    	return total_open_amount;
    }
    public void settotal_open_amount(Double amt) {
    	total_open_amount = amt;
    }

    public Date getbaseline_create_date() {
    	return baseline_create_date;
    }
    public void setbaseline_create_date(Date base_date) {
    	baseline_create_date = base_date;
    }
    
    public String getcust_payment_terms() {
    	return cust_payment_terms;
    }
    public void setcust_payment_terms(String terms) {
    	cust_payment_terms = terms;
    }
    
    public String getinvoice_id() {
    	return invoice_id;
    }
    public void setinvoice_id(String invo_id) {
    	invoice_id = invo_id;
    }
    
    public Integer getisOpen() {
    	return isOpen;
    }
    public void setisOpen(Integer open) {
    	isOpen = open;
    }

   
}

