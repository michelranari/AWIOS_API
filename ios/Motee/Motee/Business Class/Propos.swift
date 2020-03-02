//
//  Propos.swift
//  Motee
//
//  Created by Amjad Menouer on 02/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import Combine
import Foundation

class Propos : Publication {
    @Published var title : String
    
    @Published var answers : [Reponse] = []
    
    init(userP : Utilisateur, identifierP : Int, contentP : String, anonymousP : Bool, tagsP : [Tag], titleP : String) {
        self.title = titleP
        super.init(user: userP, identifier: identifierP, content: contentP, anonymous: anonymousP, tags: tagsP)
    }
    
    func addReponse(newAnswer: Reponse)->Bool{
        self.answers.append(newAnswer)
        return true
    }
    
    override func liker(userLike : Utilisateur){
        super.liker(userLike: userLike)
    }
    
    override func disliker(userDislike : Utilisateur){
        super.disliker(userDislike: userDislike)
    }
}
