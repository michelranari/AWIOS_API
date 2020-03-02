//
//  Propos.swift
//  Motee
//
//  Created by Amjad Menouer on 02/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import Combine
import Foundation

class Proposition : Publication {
    @Published var title : String
    
    @Published var answers : [Answer] = []
    
    init(userP : User, identifierP : Int, contentP : String, anonymousP : Bool, tagsP : [Tag], titleP : String) {
        self.title = titleP
        super.init(user: userP, identifier: identifierP, content: contentP, anonymous: anonymousP, tags: tagsP)
    }
    
    required init(from decoder: Decoder) throws {
        fatalError("init(from:) has not been implemented")
    }
    
    func addAnswer(newAnswer: Answer)->Bool{
        self.answers.append(newAnswer)
        return true
    }
    
    override func liker(userLike : User){
        super.liker(userLike: userLike)
    }
    
    override func disliker(userDislike : User){
        super.disliker(userDislike: userDislike)
    }
}
