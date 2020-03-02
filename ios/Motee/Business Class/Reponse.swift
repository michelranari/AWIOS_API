//
//  Reponse.swift
//  Motee
//
//  Created by Amjad Menouer on 26/02/2020.
//  Copyright © 2020 Amjad Menouer. All rights reserved.
//
import Combine
import Foundation

class Reponse : Publication {
    init(userR : Utilisateur, identifierR : Int, contentR : String, anonymousR : Bool, tagsR : [Tag]) {
        super.init(user: userR, identifier: identifierR, content: contentR, anonymous: anonymousR, tags: tagsR)
    }
    
    func getContent() -> String {
        return super.contentPub
    }
    
    override func liker(userLike : Utilisateur){
        super.liker(userLike: userLike)
    }
    
    override func disliker(userDislike : Utilisateur){
        super.disliker(userDislike: userDislike)
    }
}
