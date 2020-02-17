//
//  Persons.swift
//  TP1
//
//  Created by user164568 on 2/17/20.
//  Copyright © 2020 user164568. All rights reserved.
//

import Foundation

class Persons : Identifiable , ObservableObject{
    var persons : [Person]
    
    init(persons : [Person] ) {
        self.persons = persons
    }
    
    func add(person : Person){
        self.$persons.append([person])
    }
}
