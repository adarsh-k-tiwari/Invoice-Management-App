package com.higradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Edit
 */
@WebServlet("/Edit")
public class Edit extends HttpServlet {
	private static final long serialVersionUID = 1L;

	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/h2h_internship?zeroDateTimeBehavior=convertToNull";
    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Edit() {
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
		String USER = "root";
	    String PASS = "root";
	     
	     PreparedStatement stmt = null;
	     Connection conn = null;
	  
	     
    	
	     try {
	    	 //Register JDBC driver
	    	 Class.forName(JDBC_DRIVER);
	    	 
	    	//Open a connection
	    	 conn = DriverManager.getConnection(DB_URL, USER, PASS);
	    	 
	    	 //reading data from request
	    	 String invoice_id = request.getParameter("invoice_id");
	    	 double total_open_amount = request.getParameter("total_open_amount") != null ? Double.parseDouble(request.getParameter("total_open_amount")) : 0;
	    	 String notes = request.getParameter("notes") != null ? request.getParameter("notes"):"";
		     
		   //Execute a query
	    	 String sql = "UPDATE invoice_details SET total_open_amount=?, notes=? WHERE invoice_id='"+invoice_id+"'";
	    	 stmt = conn.prepareStatement(sql);
	    	 stmt.setDouble(1, total_open_amount);  
	    	 stmt.setString(2, notes);	               
	    	 stmt.executeUpdate();  
	              
	       	 	
	    	 	stmt.close();
	       	 	conn.close();  
	     }
	       	 	catch(Exception e) {
	       	 		
	       	 		e.printStackTrace();
	       	 	}	

	}

}
