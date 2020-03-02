//
//  Reponse.swift
//  Motee
//
//  Created by Amjad Menouer on 02/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import Combine
import Foundation

class Answer : Publication {
    init(userR : User, identifierR : Int, contentR : String, anonymousR : Bool, tagsR : [Tag]) {
        super.init(user: userR, identifier: identifierR, content: contentR, anonymous: anonymousR, tags: tagsR)
    }
    
    
    required init(from decoder: Decoder) throws {
        fatalError("init(from:) has not been implemented")
    }
    func getContent() -> String {
        return super.contentPub
    }
    
    override func liker(userLike : User){
        super.liker(userLike: userLike)
    }
    
    override func disliker(userDislike : User){
        super.disliker(userDislike: userDislike)
    }
}
