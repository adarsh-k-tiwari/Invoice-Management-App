package com.higradius;


import java.io.*;
import java.sql.*;
import java.time.*;  
import java.time.format.*;
import java.util.ArrayList;
import com.higradius.Pojo;

public class Conversion {
	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/h2h_internship";
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		 
		// Database credentials
	     String USER = "root";
	     String PASS = "root";
	     
	     PreparedStatement stmt = null;
	     Connection conn = null;
	     
	     try {
	    	//Register JDBC driver
	    	 Class.forName(JDBC_DRIVER);
	    	 
	    	//Open a connection
	    	 conn = DriverManager.getConnection(DB_URL, USER, PASS);
	    	 String csvFilePath = "C:\\HRC\\1805695.csv";
		     
		   //Execute a query
	    	 String sql = "INSERT IGNORE INTO invoice_details (business_code, cust_number, name_customer, clear_date, buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,area_business,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id,isOpen) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?)";
	    	 stmt = conn.prepareStatement(sql);

		   //Read the CSV file using buffered reader. Since buffered reader uses buffer 
	       // internally so it is faster than file reader, so it is used here. 
	    	 BufferedReader file = new BufferedReader(new FileReader(csvFilePath));
	         ArrayList<Pojo> list = new ArrayList<>();
	         
	       // Reading the CSV file line-by-line  
	         String lineText = file.readLine();
	     
	         //Reading the file until it reaches the EOF and extract the data
	         while((lineText = file.readLine())!= null) {
	        	 //create a object of POJO class
	        	 Pojo object = new Pojo();
            	
	        	 //Splitting the column by comma(,) since it is CSV
                String[] data = lineText.split(",");
                
                // storing the values of each column(of CSV file) in respective column name
                String business_code = data[0];
                String cust_number = data[1];
                String name_customer = data[2];
                String clear_date = data[3];
                String business_year = data[4];
	            String doc_id = data[5];
                
	            //parsing the posting date
                String posting_dt = data[6];      
                DateTimeFormatter formatter0 = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate posting = LocalDate.parse(posting_dt, formatter0);
                Date posting_date = Date.valueOf(posting);

              //parsing the document create date
                String document_create_dt = data[7];
                DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyyMMdd");
                LocalDate doc_create_date = LocalDate.parse(document_create_dt, formatter1);
                Date document_create_date = Date.valueOf(doc_create_date);
                
              //parsing the due in date
                String x[] = data[9].split("\\.");
                String due_date = x[0]; 
                DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyyMMdd");
                LocalDate due_dt = LocalDate.parse(due_date, formatter2);
                Date due_in_date = Date.valueOf(due_dt);
                
                String invoice_currency = data[10];
                String document_type = data[11];
                String posting_id = data[12];
                String area_business = data[13];
                String total_open_amount = data[14];
                
              //parsing the baseline create date
                String y[] = data[15].split("\\.");
                String baseline_dt = y[0]; 
                DateTimeFormatter formatter3 = DateTimeFormatter.ofPattern("yyyyMMdd");
                LocalDate baseline_date = LocalDate.parse(baseline_dt, formatter3);
                Date baseline_create_date = Date.valueOf(baseline_date);
                
                String cust_payment_terms = data[16];
                String invoice_id = data[17];
                String isOpen = data[18];
                
                
                //Retrieve data by column name
                object.setbusiness_code(business_code);
                object.setcust_number(cust_number);
                object.setname_customer(name_customer);
	             if(clear_date.length() != 0) {
	            	 object.setclear_date(clear_date);
	             }else {
	            	 object.setclear_date(null);
	             }
	             object.setbusiness_year(Double.valueOf(business_year));
	             object.setdoc_id(Double.valueOf(doc_id));
	             object.setposting_date(posting_date);
	             object.setdocument_create_date(document_create_date);
	             object.setdue_in_date(due_in_date);
	             object.setinvoice_currency(invoice_currency);
	             object.setdocument_type(document_type);
	             object.setposting_id(Float.valueOf(posting_id));
	             object.setarea_business(area_business);
	             object.settotal_open_amount(Double.valueOf(total_open_amount));
	             object.setbaseline_create_date(baseline_create_date);
	             object.setcust_payment_terms(cust_payment_terms);
	             if(invoice_id.length()!=0) {
	            	 object.setinvoice_id(String.valueOf(invoice_id));
	             }else {
	            	 object.setinvoice_id(null);
	             }
	             object.setisOpen(Integer.valueOf(isOpen));
	             list.add(object);
            }
            
            for(Pojo object: list) {
	        	 
            	stmt.setString(1, object.getbusiness_code());
            	stmt.setString(2, object.getcust_number());
            	stmt.setString(3, object.getname_customer());
            	//parsing clear date to Time Stamp format
                Timestamp clear_date;
				if(object.getclear_date() != null)
					clear_date = Timestamp.valueOf(object.getclear_date());
				else
					clear_date = null;
				
				
			    stmt.setTimestamp(4, clear_date);
	        	stmt.setDouble(5, object.getbusiness_year());
	        	stmt.setDouble(6, object.getdoc_id());
	        	stmt.setDate(7, object.getposting_date());
	        	stmt.setDate(8, object.getdocument_create_date());
	        	stmt.setDate(9, object.getdue_in_date());
	        	stmt.setString(10, object.getinvoice_currency());
	        	stmt.setString(11, object.getdocument_type());
	        	stmt.setFloat(12, object.getposting_id());
	        	//Since area business is NULL so assigning NULL
	        	stmt.setString(13, null);
	        	stmt.setDouble(14, object.gettotal_open_amount());
	        	stmt.setDate(15, object.getbaseline_create_date());
	        	stmt.setString(16, object.getcust_payment_terms());
	        	//Converting the data type of invoice_id to Long
	        	if(object.getinvoice_id()!=null) {
	        		stmt.setString(17, object.getinvoice_id());
	        	}else {
	        		stmt.setLong(17, Types.NULL);
	        	}
	        	stmt.setInt(18, object.getisOpen());
	        	
	        	
	        	int batchSize = 100;
		        int count = 0;
		        stmt.addBatch();
		            
		       	if (count % batchSize == 0) {
		       		stmt.executeBatch();
		       	}
		       	stmt.executeUpdate();
	        	 
	        	 
	         }
            stmt.executeBatch();
	         
          //Clean-up environment
	         if(stmt!=null)
					stmt.close();
			 if(conn!=null)
					conn.close();
			 file.close();
		
	         
	     }catch(IOException exp) {
	    	//Handle errors for IO
	    	 exp.printStackTrace();
	     }
	     catch(SQLException ex) {
	    	//Handle errors for JDBC
	    	 ex.printStackTrace();
	     }catch(Exception e) {
	    	//Handle errors for Class.forName
	    	 e.printStackTrace();
	     }
	     
	   //Displaying last message after importing the data into table
		 System.out.println("Yayyy!!!! We've done it. Now, go and checkout the h2h_internship database in SQLyog.");
 
	}

}

