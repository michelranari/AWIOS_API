//
//  PropositionDAO.swift
//  Motee
//
//  Created by Amjad Menouer on 13/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import Foundation

class PropositionDAO {
    
    let rootURI : String = "https://_.herokuapp.com"
    
    //----------------------------------
    //---------- GET requests ----------
    //----------------------------------
    
    func getAll()->[Proposition]{
        // Prepare URL
        let stringURL = self.rootURI+"get?all"
        let url = URL(string: stringURL)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object (GET)
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)
        // Perform HTTP Request
        var res : [Proposition] = []
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
                
            // Check for Error
            if let error = error {
                print("Error took place :\(error)")
                return
            }
        
            // Convert HTTP Response Data to a String
            if let data = data{
                do{
                    res = try JSONDecoder().decode([Proposition].self, from: data)
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
}
