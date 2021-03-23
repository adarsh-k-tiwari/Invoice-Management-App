package com.higradius;

import java.io.IOException;
//import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import com.google.gson.Gson;

/**
 * Servlet implementation class Add
 */
@WebServlet("/Add")
public class Add extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/h2h_internship?zeroDateTimeBehavior=convertToNull";
    
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Add() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String USER = "root";
	    String PASS = "root";
	     
	     Connection conn = null;
	     
	     try {
	    	//Register JDBC driver
	    	 Class.forName(JDBC_DRIVER);
	    	 
	    	//Open a connection
	    	 conn = DriverManager.getConnection(DB_URL, USER, PASS);
		     
	    	 //reading data from request
	    	 String name_customer = request.getParameter("name_customer");
	    	 String cust_number = request.getParameter("cust_number");
	    	 String invoice_id = request.getParameter("invoice_id");
	    	 double total_open_amount = request.getParameter("total_open_amount") != null ? Double.parseDouble(request.getParameter("total_open_amount")) : 0;
	    	 String due_in_date = request.getParameter("due_in_date");
	    	 String notes = request.getParameter("notes") != null ? request.getParameter("notes"):" ";
	    	 
	    	 
		   //Execute a query
	    	 String sql = "INSERT IGNORE INTO invoice_details(name_customer, cust_number, invoice_id, total_open_amount, due_in_date, notes) VALUES (?, ?, ?, ?, ?, ?)";
	    	 PreparedStatement ps = conn.prepareStatement(sql);
	    	 
	                ps.setString(1, name_customer);  
	                ps.setString(2, cust_number);  
	                ps.setString(3, invoice_id);  
	                ps.setDouble(4, total_open_amount);  
	                ps.setString(5, due_in_date);
	                ps.setString(6, notes);	               
	                ps.executeUpdate();  
	              
	       	 	
	       	 	ps.close();
	       	 	conn.close();  
	     }
	       	 	catch(Exception e) {
	       	 		
	       	 		e.printStackTrace();
	       	 	}	
  
  	
		
	}

}
