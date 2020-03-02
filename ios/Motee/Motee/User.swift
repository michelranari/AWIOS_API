//
//  User.swift
//  Motee
//
//  Created by Rayan Bahroun on 02/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import Foundation

class User : Identifiable, Codable {
    var pseudo , mail , mdp  : String
    var id : Int
    init(id: Int ,pseudo : String, mail : String, mdp :String ) {
        self.id = id
        self.pseudo = pseudo
        self.mail = mail
        self.mdp = mdp
    }
}
