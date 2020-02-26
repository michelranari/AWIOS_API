//
//  Tag.swift
//  Motee
//
//  Created by Amjad Menouer on 26/02/2020.
//  Copyright © 2020 Amjad Menouer. All rights reserved.
//

import Foundation

class Tag : Identifiable, ObservableObject {
    @Published private var label : String
    @Published private var nbOccurences : Int = 0
    
    var id : String {return self.label}
    
    private var publications : [Publication] = []
    
    init(label : String) {
        self.label = label
    }
}
