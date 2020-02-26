//
//  Propos.swift
//  Motee
//
//  Created by Amjad Menouer on 26/02/2020.
//  Copyright © 2020 Amjad Menouer. All rights reserved.
//

import Foundation

class Propos : Publication {
    @Published private var title : String
    
    private var answers : [Reponse] = []
    
    init(userP : Utilisateur, identifierP : Int, contentP : String, anonymousP : Bool, tagsP : [Tag], titleP : String) {
        self.title = titleP
        super.init(user: userP, identifier: identifierP, content: contentP, anonymous: anonymousP, tags: tagsP)
    }
}
