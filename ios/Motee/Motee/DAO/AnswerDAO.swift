//
//  AnswerDAO.swift
//  Motee
//
//  Created by Amjad Menouer on 12/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import Foundation

public class AnswerDAO {

    //Get : byLikes, byDate
    //Post : ajout
    //Put : ~Update (if Owner)
    //Delete : (if Admin or Owner)
    
    let rootURI : String = "https://..."

    //----------------------------------
    //---------- GET requests ----------
    //----------------------------------

    func getAll()->[Answer]{
        // Prepare URL
        let stringURL = self.rootURI+"get?all"
        let url = URL(string: stringURL)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object (GET)
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)
        // Perform HTTP Request
        var res : [Answer] = []
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
                
            // Check for Error
            if let error = error {
                print("Error took place :\(error)")
                return
            }
        
            // Convert HTTP Response Data to a String
            if let data = data{
                do{
                    res = try JSONDecoder().decode([Answer].self, from: data)
                }catch let error {
                    print(error)
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        
        return res
    }

    //----------------------------------
    //---------- POST requests ---------
    //----------------------------------

    
    

    //----------------------------------
    //---------- PUT requests ----------
    //----------------------------------

    
    
    //----------------------------------
    //---------- DELETE requests -------
    //----------------------------------
    
    func deleteAnswer(answerId : String, token : String) -> Bool{
        // Prepare URL
        let stringurl = "https://_.herokuapp.com/answers/delete?token="+token
        let url = URL(string: stringurl)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "DELETE"
         
        // HTTP Request Parameters which will be sent in HTTP Request Body
        let postString = "id="+answerId;
        // Set HTTP Request Body
        request.httpBody = postString.data(using: String.Encoding.utf8);
        var res : Bool = false
        // Perform HTTP Request
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
                
                // Check for Error
                if let error = error {
                    print("Error took place \(error)")
                    return
                }
         
                // Convert HTTP Response Data to a String
                    let resp = response as? HTTPURLResponse
                    res = (resp?.statusCode == 200)
                
        }
        task.resume()
        return res
    }

}
